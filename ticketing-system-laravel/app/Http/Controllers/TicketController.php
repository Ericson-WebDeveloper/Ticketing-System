<?php

namespace App\Http\Controllers;

use App\Events\ReAssignTicket;
use App\Events\TicketAssign;
use App\Http\Controllers\Helper\HelperController;
use App\Http\Requests\AddTicketRequest;
use App\Http\Requests\AssignNewOwnerRequest;
use App\Http\Requests\OpenTicketUpdateRequest;
use App\Http\Resources\OpenTicketsResource;
use App\Mail\TicketAssignMail;
use App\Models\Ticket;
use App\Models\TicketStatus;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class TicketController extends Controller
{
    public $helpercontrol;
    public function __construct()
    {
        $this->helpercontrol = new HelperController;
    }

    public function newTicket(AddTicketRequest $request)
    {
        try {
            DB::beginTransaction();
            $ticket = Ticket::create([
                'user_id' => $request->user()->id,
                'ticket_name' => $request->ticket_name,
                'control_no' => $request->control_no,
                'description' => $request->description,
                'root_cause' => $request->root_cause,
            ]);

            $response = $ticket->progress()->create([
                'status_id' => $request->status_id,
                'environment_id' => $request->environment_id,
                'type_id' =>  $request->type_id
            ]);

            if($response) {
                DB::commit();
                return $this->helpercontrol->returnResponse(['message' => 'New Ticket Was Created!'], 200);
            }
            DB::rollBack();
            return $this->helpercontrol->returnResponse(['error' => 'New Ticket Was Create Failed!'], 400);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->helpercontrol->returnResponse(['error' => $e->getMessage()], 500);
        }
    }

    public function openTicketsAssign(Request $request)
    {
        try {
            $tickets = Ticket::with(['creator','progress'])->where('owner_id', null)->get();
            return $this->helpercontrol->returnResponse(['tickets' => OpenTicketsResource::collection($tickets)], 200);
        } catch (\Exception $e) {
            return $this->helpercontrol->returnResponse(['error' => $e->getMessage()], 500);
        }
    }

    public function getTicket(Request $request, $id)
    {
        try {
            $ticket = Ticket::query()->with(['creator', 'progress', 'qa', 'owner'])->where('id', $id);
            if($request->user()->job->name == 'Programmer') {
                Log::info($request->user()->job->name . ' ' . $request->user()->id . ' ' . $request->user()->name);
                $ticket = $ticket->where('owner_id', $request->user()->id);
            }
            $ticket = $ticket->first();
            return $this->helpercontrol->returnResponse(['ticket' => $ticket], 200);
        } catch (\Exception $e) {
            return $this->helpercontrol->returnResponse(['error' => $e->getMessage()], 500);
        }
    }

    public function sendEmailToProgrammer(Request $request) 
    {
        $ticket = Ticket::with(['qa', 'programmer','owner'])->where('id', $request->ticket_id)->first();
        $user = User::where('id', $request->p_id)->first();
        TicketAssign::dispatch($ticket, $user->email);
    }

    public function sendReAssignTicketEmail(Request $request) 
    {
        try {
            $ticket = Ticket::with(['qa', 'programmer', 'owner'])->where('id', $request->ticket_id)->first();
            $qa = User::where('id', $ticket->qa_id)->first();
            $programmer = User::where('id', $ticket->programmer_id)->first();
            ReAssignTicket::dispatch($ticket, 'Programmer', $programmer->email);
            ReAssignTicket::dispatch($ticket, 'QA', $qa->email);
        } catch (\Exception $e) {
            return $this->helpercontrol->returnResponse(['error' => 'Send Email Notification to Owner Failed.'], 500);
        }
    }

    public function assignTicket(AssignNewOwnerRequest $request, $id)
    {
        try {
            $ticket = Ticket::with(['qa', 'programmer','owner'])->where('id', $id)->first();
            // $user = User::where('id',$request->programmer_id)->first();
            if(!$ticket) {
                return $this->helpercontrol->returnResponse(['error' => 'Ticket not Found'], 400);
            }

            // $ticket->programmer_id = $request->programmer_id;
            // $ticket->qa_id' => $request->qa_id,
            //     'owner_id' => $request->programmer_id,
            // ]);

            $ticket->programmer_id = $request->programmer_id;
            $ticket->qa_id = $request->qa_id;
            $ticket->owner_id = $request->programmer_id;
            $ticket->progress->status_id = 6;
            $response = $ticket->push();
            // send Email Notify That this was Reassign to other;

            if($response) {
                // Log::info($response);
                // $r = Mail::to($request->email)->send(new TicketAssignMail($ticket)); 
                DB::commit();
                return $this->helpercontrol->returnResponse(['message' => 'Ticket Was Assigned Success!', 
                'ticket_id' => $ticket->id, 'p_id' => $request->programmer_id], 200);
            }
            DB::rollBack();
            return $this->helpercontrol->returnResponse(['error' => 'Ticket Was Assigned Failed!'], 400);

        } catch (\Exception $e) {
            return $this->helpercontrol->returnResponse(['error' => $e->getMessage()], 500);
        }
    }

    public function assignToQA (Request $request, $id)
    {
        // put
        try {
            $ticket = Ticket::where('id', $id)->first();

            if(!$ticket) {
                return $this->helpercontrol->returnResponse(['error' => 'Ticket not Found'], 400);
            }

            $response = $ticket->update([
                // 'programmer_id' => $request->user_id
                'programmer_id' => $ticket->qa_id
            ]);

            if($response) {
                DB::commit();
                return $this->helpercontrol->returnResponse(['message' => 'Ticket Was Assigned to QA Success!', $ticket->refresh()], 200);
            }
            DB::rollBack();
            return $this->helpercontrol->returnResponse(['error' => 'Ticket Was Assigned to QA  Failed!'], 400);

        } catch (\Exception $e) {
            return $this->helpercontrol->returnResponse(['error' => $e->getMessage()], 500);
        }
    }

    public function backToOwner($id)
    {
        // put
        try {
            $ticket = Ticket::where('id', $id)->first();

            if(!$ticket) {
                return $this->helpercontrol->returnResponse(['error' => 'Ticket not Found'], 400);
            }

            $ticket->programmer_id = $ticket->owner_id;
            $response = $ticket->push();

            if($response) {
                DB::commit();
                return $this->helpercontrol->returnResponse(['message' => 'Ticket Was Assigned to Owner Success!'], 200);
            }
            DB::rollBack();
            return $this->helpercontrol->returnResponse(['error' => 'Ticket Was Assigned to Owner Failed!'], 400);

        } catch (\Exception $e) {
            return $this->helpercontrol->returnResponse(['error' => $e->getMessage()], 500);
        }
    }

    public function updateTicket(OpenTicketUpdateRequest $request, $id)
    {
        try {
            $ticket = Ticket::with('qa')->where('id', $id)->first();

            if(!$ticket) {
                return $this->helpercontrol->returnResponse(['error' => 'Ticket not Found'], 400);
            }

            DB::beginTransaction();
            $ticket->ticket_name = $request->ticket_name;
            $ticket->control_no = $request->control_no;
            $ticket->description = $request->description;
            $ticket->progress->status_id = $request->status_id;
            $ticket->progress->environment_id = $request->environment_id;
            $ticket->progress->type_id =  $request->type_id;
            $response = $ticket->push();

            if($response) {
                DB::commit();
                // use refresh in updating data to get fresh newly update data;
                return $this->helpercontrol->returnResponse(['message' => 'Ticket Was Assigned Success!', 'ticket' => $ticket->refresh()], 200);
            }
            DB::rollBack();
            return $this->helpercontrol->returnResponse(['error' => 'Ticket Was Assigned Failed!'], 400);

        } catch (\Exception $e) {
            DB::rollBack();
            return $this->helpercontrol->returnResponse(['error' => $e->getMessage()], 500);
        }
    }

    public function countTicketsByStatus() {
        try {
            // TicketStatus::select('status_name')->groupBy('status_name')->count();
            // DB::raw('COUNT(issue_subscriptions.issue_id) as followers'))
            // $counts = DB::table('ticket_statuses')->select(['status_name', DB::raw('COUNT(*) as count_total')])
            $counts = DB::table('tickets')->select(['status_name', DB::raw('COUNT(*) as count_total')])
            ->leftJoin('ticket_progress', 'ticket_progress.ticket_id', '=', 'tickets.id')
            ->leftJoin('ticket_statuses', 'ticket_progress.status_id', '=', 'ticket_statuses.id')
            ->groupBy('status_name')
            // ->orderBy('created_at', 'desc')
            ->get();

            return $this->helpercontrol->returnResponse(['counts' => $counts], 200);
        } catch (\Exception $e) {
            return $this->helpercontrol->returnResponse(['error' => $e->getMessage()], 500);
        }
    }

    public function updateTicketRemarks(Request $request, $id)
    {
       try {
            $ticket = Ticket::with(['programmer', 'qa'])->where('id', $id)->first();

            if(!$ticket) { // make a helper hook
                return $this->helpercontrol->returnResponse(['error' => 'Ticket not Found'], 400);
            }

            if(!$this->helpercontrol->isAllowedEditByOwnerShip($request, $ticket)) {
                return $this->helpercontrol->returnResponse([
                    'error' => 'You Dont Have any Credentials to tamper this Data',
                    'message' => 'You Dont Have any Credentials to tamper this Data',
                ], 403);
            }

            DB::beginTransaction();
            $ticket->remarks = $request->remarks;
            $response = $ticket->push();

            if($response) {
                DB::commit();
                return $this->helpercontrol->returnResponse(['message' => 'Ticket Remarks Updated Success!', 'ticket' => $ticket->refresh()], 200);
            }
            DB::rollBack();
            return $this->helpercontrol->returnResponse(['error' => 'Ticket Remarks Updated Failed!'], 400);
       } catch (\Exception $e) {
            return $this->helpercontrol->returnResponse(['error' => $e->getMessage()], 500);
        }
    }

    public function updateTicketDetails(Request $request, $id)
    {
        try {
            $ticket = Ticket::with(['qa', 'programmer', 'owner'])->where('id', $id)->first();

            if(!$ticket) {
                return $this->helpercontrol->returnResponse(['error' => 'Ticket not Found'], 400);
            }

            if(!$this->helpercontrol->isAllowedEditByOwnerShip($request, $ticket)) {
                return $this->helpercontrol->returnResponse([
                    'error' => 'You Dont Have any Credentials to tamper this Data',
                    'message' => 'You Dont Have any Credentials to tamper this Data',
                ], 403);
            }

            DB::beginTransaction();
            $ticket->ticket_name = $request->ticket_name;
            $ticket->control_no = $request->control_no;
            $ticket->description = $request->description;
            $ticket->solution = $request->solution ?? $ticket->solution;
            $ticket->root_cause = $request->root_cause ?? $ticket->root_cause;
            $ticket->progress->status_id = $request->status_id;
            $ticket->progress->environment_id = $request->environment_id;
            $ticket->progress->type_id =  $request->type_id;
            $response = $ticket->push();
            // resoucers with qa, programmer, owner
            if($response) {
                DB::commit();
                return $this->helpercontrol->returnResponse(['message' => 'Ticket Was Updated Success!', 'ticket' => $ticket->refresh()], 200);
            }
            DB::rollBack();
            return $this->helpercontrol->returnResponse(['error' => 'Ticket Was Updated Failed!'], 400);

        } catch (\Exception $e) {
            DB::rollBack();
            return $this->helpercontrol->returnResponse(['error' => $e->getMessage()], 500);
        }
    }

}
