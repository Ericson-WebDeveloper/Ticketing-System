<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Helper\HelperController;
use App\Http\Controllers\Helper\IndexController;
use App\Http\Requests\CreateNewUserRequest;
use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Resources\ProgrammerResources;
use App\Http\Resources\QAResources;
use App\Http\Resources\QAResourcesTickets;
use App\Http\Resources\UsersTicketsResource;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public $helpercontrol;
    
    public function __construct()
    {
        $this->helpercontrol = new HelperController;
    }

    public function show($id)
    {
        try {

            $user = User::where('id', $id)
            ->whereHas('roles', function(Builder $query) {
                $query->whereNotIn('name', ['Admin', 'Super Admin']);
            })->first();
            
            return $this->helpercontrol->returnResponse([
                'user' => $user, $id
            ], 200);

        } catch (\Exception $e) {
            return $this->helpercontrol->returnResponse(['error' => $e->getMessage()], 500);
        }
    }

    public function dashTickets(IndexController $index, Request $request)
    {
        try {
            // QA make for 
            $status = $index->statusCounts($request);
            $users = $index->usersCount($request);
            $env = $index->envCounts($request);
            $type = $index->typeCounts($request);

            return $this->helpercontrol->returnResponse([
                'status' => $status,
                'users' => $users,
                'env' => $env,
                'type' => $type,
            ], 200);
        } catch (\Exception $e) {
            return $this->helpercontrol->returnResponse(['error' => $e->getMessage()], 500);
        }
    }

    public function qaAll()
    {
        try {
            $users = User::where('job_id', '4')->get();
            return $this->helpercontrol->returnResponse([
                'users' => QAResources::collection($users),
            ], 200);
        } catch (\Exception $e) {
            return $this->helpercontrol->returnResponse(['error' => $e->getMessage()], 500);
        }
    }

    public function programmerAll()
    {
        try {
            $users = User::where('job_id', '3')->get();
            return $this->helpercontrol->returnResponse([
                'users' => ProgrammerResources::collection($users),
            ], 200);
        } catch (\Exception $e) {
            return $this->helpercontrol->returnResponse(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $user = User::where('id', $id)->first();

            if(!$user) {
                return $this->helpercontrol->returnResponse(['error' => 'User Not Found'], 400);
            }

            DB::beginTransaction();
            
            $response = $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'password' => $request->password ? Hash::make($request->password) : $user->password,
                'job_id' => $request->job_id,
            ]);

            $response2 = $user->detail()->update([
                'employee_no' => $request->employee_no,
                'nickname' => $request->nickname,
            ]);

            if($response && $response2) {
                DB::commit();
                return $this->helpercontrol->returnResponse(['message' => 'User Was Updated Success!'], 200);
            }

            DB::rollBack();
            return $this->helpercontrol->returnResponse(['error' => 'User Was Updating Failed!'], 400);

        } catch (\Exception $e) {
            DB::rollBack();
            return $this->helpercontrol->returnResponse(['error' => $e->getMessage()], 500);
        }
    }

    public function userAll(Request $request)
    {
        try {
            $users = User::where('id', '!=', $request->user()->id)
            ->whereHas('roles', function(Builder $query) {
                $query->whereNotIn('name', ['Admin', 'Super Admin']);
            })->get();
            return $this->helpercontrol->returnResponse([
                'users' => $users,
            ], 200);
        } catch (\Exception $e) {
            return $this->helpercontrol->returnResponse(['error' => $e->getMessage()], 500);
        }
    }

    public function createNewUser(CreateNewUserRequest $request)
    {
        try {
            DB::beginTransaction();
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'job_id' => $request->job_id
            ]);

            $this->helpercontrol->assignRole($request->role_id, $user);

            $image = $this->helpercontrol->storeImage($request, 'users');
            $image2 = base64_encode(file_get_contents($request->file('image')));
            Log::info($image2);
            $response = $user->detail()->create([
                'employee_no' => $request->employee_no,
                'nickname' => $request->nickname,
                'profile_img' => $image
            ]);

            if($response) {
                DB::commit();
                return $this->helpercontrol->returnResponse(['message' => 'New User Was Created!'], 200);
            }
            DB::rollBack();
            return $this->helpercontrol->returnResponse(['error' => 'New User Was Create Failed!'], 400);
        }  catch (\Exception $e) {
            DB::rollBack();
            return $this->helpercontrol->returnResponse(['error' => $e->getMessage()], 500);
        }
    }

    public function updateProfile(ProfileUpdateRequest $request)
    {
        try {
            $user = User::find($request->user()->id);
            if(!$user) {
                return $this->helpercontrol->returnResponse(['error' => 'User Data Not FOund'],400);
            }
            DB::beginTransaction();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = $request->password ? Hash::make($request->password) : $user->password;
            $user->detail->nickname = $request->nickname;
            $user->detail->employee_no = $request->employee_no;
            $response = $user->push();

            if($response) {
                DB::commit();
                return $this->helpercontrol->returnResponse(['message' => 'New User Was Created!', 'user'=> $user->refresh()], 200);
            }
            DB::rollBack();
            return $this->helpercontrol->returnResponse(['error' => 'New User Was Create Failed!'], 400);

        } catch (\Exception $e) {
            DB::rollBack();
            return $this->helpercontrol->returnResponse(['error' => $e->getMessage()], 500);
        }
    }

    public function updateProfileImage(Request $request)
    {
        try {
            $user = User::find($request->user()->id);

            if(!$request->image) {
                return $this->helpercontrol->returnResponse(['error' => 'Image is Required'],400);
            }
            DB::beginTransaction();
            $image_path = $this->helpercontrol->storeImage($request, 'users');
            
            $user->detail->profile_img = $image_path;
            $response = $user->push();

            if($response) {
                DB::commit();
                return $this->helpercontrol->returnResponse(['message' => 'Profile Image Updated!', 'user'=> $user->refresh()], 200);
            }
            return $this->helpercontrol->returnResponse(['error' => 'Profile Image Updating Failed!'], 400);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->helpercontrol->returnResponse(['error' => $e->getMessage()], 500);
        }
    }

    public function getTicketsByUser()
    // for all tickets in admin
    {
        try {
            $users = User::with(['programmertickets' => function($q) {
                $q->orderBy('created_at', 'desc');
            }])->whereHas('programmertickets')
            ->get();
            return $this->helpercontrol->returnResponse(['users' => UsersTicketsResource::collection($users)], 200);
        } catch (\Exception $e) {
            return $this->helpercontrol->returnResponse(['error' => $e->getMessage()], 500);
        }
    }

    public function getTicketsAllUser(Request $request)
    // for QA - user/tickets-list/all
    {
        try {
            $tickets = Ticket::with(['programmer', 'qa'])->where('programmer_id', $request->user()->id)
            // ->where('qa_id', $request->user()->id)
            ->orderBy('created_at', 'desc')->paginate(5);
            return $this->helpercontrol->returnResponse(['tickets' => $tickets], 200);
        } catch (\Exception $e) {
            return $this->helpercontrol->returnResponse(['error' => $e->getMessage()], 500);
        }
    }


    public function ownOpenTicketsUser(Request $request)
    {
        // for user Tickets
        // user un resolved or not complete all tickets
        try {
            $tickets = Ticket::whereHas('progress', function($q) {
                $q->whereHas('status', function($q) {
                    $q->whereNotIn('status_name', ['open', 'closed', 'resolved']);
                });
            })->where('programmer_id', $request->user()->id)
            ->get();
            return $this->helpercontrol->returnResponse(['tickets' => $tickets], 200);
        } catch (\Exception $e) {
            return $this->helpercontrol->returnResponse(['error' => $e->getMessage()], 500);
        }
    }

    public function qaAssignTicketsUser(Request $request)
    {
        // for user Tickets
        try {
            $tickets = Ticket::with('owner')->where('qa_id', $request->user()->id);
            return $this->helpercontrol->returnResponse([
                // api paginate with collection
                // link: https://gist.github.com/simonhamp/549e8821946e2c40a617c85d2cf5af5e
                'tickets' => new QAResourcesTickets($tickets->paginate(5))], 200);
        } catch (\Exception $e) {
            Log::info($e);
            return $this->helpercontrol->returnResponse(['error' => $e->getMessage()], 500);
        }
    }


    public function showUser(IndexController $index, $email)
    {
        try {
            $user = $index->getUser($email);
            return $this->helpercontrol->returnResponse(['user' => $user], 200);
        } catch (\Exception $e) {
            return $this->helpercontrol->returnResponse(['error' => $e->getMessage()], 500);
        }
    }

    public function showUsersTicket($userid)
    {
        try {
            $tickets = Ticket::with(['qa'])->where('owner_id', $userid)->paginate(10);
            return $this->helpercontrol->returnResponse(['tickets' => $tickets], 200);
        } catch (\Exception $e) {
            return $this->helpercontrol->returnResponse(['error' => $e->getMessage()], 500);
        }
    }

}
