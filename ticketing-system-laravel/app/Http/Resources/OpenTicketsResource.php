<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OpenTicketsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'control_no' => $this->control_no,
            'description' => $this->description,
            'owner_id' => $this->owner_id,
            'programmer_id' => $this->programmer_id,
            'qa_id' => $this->qa_id,
            'remarks' => $this->remarks,
            'root_cause' => $this->root_cause,
            'solution' => $this->solution,
            'ticket_name' => $this->ticket_name,
            'creator' => new CreatorResource($this->creator),
            'progress' => new TicketProgressResource($this->progress)
        ];
    }
}
