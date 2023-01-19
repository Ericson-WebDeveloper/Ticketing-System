<?php

namespace App\Http\Controllers\Helper;

use App\Http\Controllers\Controller;
use App\Models\TicketEnvironment;
use App\Models\TicketStatus;
use App\Models\TicketType;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Helper\HelperController;
use App\Models\Job;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;

class IndexController extends Controller
{
    // fetch in select option

    private $helper;

    public function __construct()
    {
        $this->helper = new HelperController;
    }

    public function roles()
    {
        return $this->helper->returnResponse(['roles' => Role::all()],200);
    }

    public function envs()
    {
        return $this->helper->returnResponse(['environments' =>TicketEnvironment::all()],200);
    }

    public function status()
    {
        return $this->helper->returnResponse(['status' =>TicketStatus::all()],200);
    }

    public function type()
    {
        return $this->helper->returnResponse(['types' => TicketType::all()],200);
    }

    public function jobs()
    {
        return $this->helper->returnResponse(['jobs' => Job::all()],200);
    }

    public function isUser($request)
    {
        $names = array();
        $roles = $request->user()->roles;
        foreach($roles as $role) {
            array_push($names, $role->name);
        }
        return in_array('User', $names) ? true : false;
    }

    public function isQa($request)
    {
        $job = $request->user()->job->name;
        return $job == 'Q.A' ? true : false;
    }

    public function statusCounts($request)
    {
        $userBolean = $this->isUser($request);     //status_name as name           // COUNT(*) as status_total
        $status =  DB::table('tickets')->select(['status_name', DB::raw('COUNT(*) as status_total')])
            ->leftJoin('ticket_progress', 'ticket_progress.ticket_id', '=', 'tickets.id')
            ->leftJoin('ticket_statuses', 'ticket_progress.status_id', '=', 'ticket_statuses.id');
        if($userBolean) {
            $field = $this->isQa($request) ? 'tickets.qa_id' : 'tickets.owner_id';
            return $status
            ->where($field, '=', $request->user()->id)
            ->groupBy('status_name')
            // ->groupBy('name')
            ->get();
        } else {
            return $status
            ->groupBy('status_name')
            // ->groupBy('name')
            ->get();
        }
            
    }

    public function envCounts($request)
    {
        $userBolean = $this->isUser($request);   //environment_name as name 
        $env = DB::table('tickets')->select(['environment_name', DB::raw('COUNT(*) as environment_total')])
            ->leftJoin('ticket_progress', 'ticket_progress.ticket_id', '=', 'tickets.id')
            ->leftJoin('ticket_environments', 'ticket_progress.environment_id', '=', 'ticket_environments.id');
            
        if($userBolean) {
            $field = $this->isQa($request) ? 'tickets.qa_id' : 'tickets.owner_id';
            return $env
            ->where($field, '=', $request->user()->id)
            // ->groupBy('name')
            ->groupBy('environment_name')
            ->get();
        } else {
            return $env
            // ->groupBy('name')
            ->groupBy('environment_name')
            ->get();
        }
    }

    public function typeCounts($request)
    {
        $userBolean = $this->isUser($request);  //type_name as name 
        $type =  DB::table('tickets')->select(['type_name', DB::raw('COUNT(*) as type_total')])
            ->leftJoin('ticket_progress', 'ticket_progress.ticket_id', '=', 'tickets.id')
            ->leftJoin('ticket_types', 'ticket_progress.type_id', '=', 'ticket_types.id');
            
        if($userBolean) {
            $field = $this->isQa($request) ? 'tickets.qa_id' : 'tickets.owner_id';
            return $type
            ->where($field, '=', $request->user()->id)
            ->groupBy('type_name')
            // ->groupBy('name')
            ->get();
        } else {
            return $type
            ->groupBy('type_name')
            // ->groupBy('name')
            ->get();
        }
    }

    public function usersCount()
    {
        return DB::table('users')
        ->select('jobs.name', DB::raw('count(*) as user_total'))
        ->leftJoin('jobs', 'jobs.id', '=', 'users.job_id')
        ->groupBy('jobs.name')
        ->get();
    }

    public function users(Request $request)
    {
        try {
            $users = User::where('id', '!=', $request->user()->id)
            ->whereHas('roles', function(Builder $query) {
                $query->whereNotIn('name', ['Admin', 'Super Admin']);
            })->paginate(5);
            return response()->json([
                'users' => $users,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getUser($email = null, $id = null)
    {
        if($email) {
            return User::where('email', $email)->first();
        } else if ($id ) {
            return User::where('id', $id)->first();
        } else {
            return null;
        }
    }

}
