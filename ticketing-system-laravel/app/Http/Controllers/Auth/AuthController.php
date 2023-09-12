<?php

namespace App\Http\Controllers\Auth;

use App\Events\LoginHistory;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Helper\HelperController;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Mail\ResetPasswordRequestMail;
use Carbon\Carbon;
use Closure;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;


class AuthController extends Controller
{
    private $helpercontroller;

    public function __construct()
    {
        $this->helpercontroller = new HelperController;
    }

    public function checkingExpiration(Request $request)
    {
        try {
            $data = User::where('remember_token', $request->token)->where('email', $request->email)->first();
            if(!$data) {
                return $this->helpercontroller->returnResponse(['error' => 'Invalid Email/Token'], 400);
            }
            // $s = Carbon::now()->diffInSeconds($data->updated_at);
            if(!$this->helpercontroller->checkingExpireSecond($data->updated_at, 350)) {
                return $this->helpercontroller->returnResponse(['error' => 'Expired Token. Please Request new Password Reset'], 400);
            }

            return $this->helpercontroller->returnResponse(['message' => 'Ok'], 200);
        } catch (\Exception $e) {
            return $this->helpercontroller->returnResponse(['error' => $e->getMessage()], 500);
        }
    }

    public function updatePass(UpdatePasswordRequest $request, $email)
    {
        try {
            //service container
            $data = User::where('remember_token', $request->token)
            ->where('email', $email)->first();

            if(!$data) {
                return $this->helpercontroller->returnResponse(['error' => 'Invalid Email & Token'], 400);
            }
            // $this->helpercontroller->checkingExpireSecond($data->updated_at, 350);
            if(!$this->helpercontroller->checkingExpireSecond($data->updated_at, 350)) {
                return $this->helpercontroller->returnResponse(['error' => 'Expired Token. Please Request new Password Reset'], 400);
            }

            $data->password = Hash::make($request->password);

            if($data->save()) {
                return $this->helpercontroller->returnResponse(['message' => 'Ok'], 200);
            }
            return $this->helpercontroller->returnResponse(['error' => 'Updating Password Failed. try again later'], 400);
            
        } catch (\Exception $e) {
            return $this->helpercontroller->returnResponse(['error' => $e->getMessage()], 500);
        }
    }

    public function forgotpassword(Request $request)
    {
        try {
            $user = User::where('email', $request->email)->first();
            if(!$user) {
                return $this->helpercontroller->returnResponse(['error' => 'User Email not Found'], 400);
            }
            // Log::info($user->updated_at->diffForHumans());
            $user->remember_token = Str::random(10);
            $user->updated_at = Carbon::now()->timestamp;
            if($user->save()) {
               $response = Mail::to($request->email)->send(new ResetPasswordRequestMail($request->email, $user->remember_token, $user)); 
               return $this->helpercontroller->returnResponse(['message' 
            => 'Link was sent to your email. please go to your email and update your password'], 200);
            } else {
                return $this->helpercontroller->returnResponse(['error' => 'Something wrong in Server. Try again later'], 400);
            }
        } catch (\Exception $e) {
            return $this->helpercontroller->returnResponse(['error' => $e->getMessage()], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            Auth::guard('web')->logout();
            // $request->session()->invalidate();
            return $this->helpercontroller->returnResponse(['meessage' => 'Logout Success'], 200);
        } catch (\Exception $e) {
            return $this->helpercontroller->returnResponse(['error' => $e->getMessage()], 500);
        }
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        try {
            $user = User::where('email', $request->email)->first();

            if(!$user) {
                return $this->helpercontroller->returnResponse([
                    'error' => 'Sorry Invalid Credentials'
                ], 400);
            }

            if(Auth::attempt($credentials)) {
                $user = Auth::user();
                LoginHistory::dispatch($user);
                return $this->helpercontroller->returnResponse([
                    'message' => 'Success',
                    'user' => $user
                ], 200);

            } else {
                return $this->helpercontroller->returnResponse([
                    'error' => 'Invalid Credentials'
                ], 400);
            }
        } catch (\Exception $e) {
            return $this->helpercontroller->returnResponse([
                'error' => $e->getMessage()
            ], 500);

        }

    }

    public function register(RegisterRequest $request)
    {
        DB::beginTransaction();
        
        if($request->has('image')) {
            $image_path = $this->helpercontroller->storeImage($request, 'users');
        }
        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            $response = UserDetail::create([
                'user_id' => $user->id,
                'employee_no' => $request->employee_no,
                'nickname' => $request->nickname,
                'profile_img' => $image_path
            ]);

            $this->helpercontroller->assignRole($request->role, $user);
            // $user->assignRole($request->role);
            if($user && $response) {
                DB::commit();
                return $this->helpercontroller->returnResponse(['message' => 'Registration Complete!. you can login now'], 200);
            } else {
                DB::rollBack();
                return $this->helpercontroller->returnResponse(['error' => 'Registration Failed'], 400);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->helpercontroller->returnResponse(['error' => $e->getMessage()], 500);
        }
    }
    
}
