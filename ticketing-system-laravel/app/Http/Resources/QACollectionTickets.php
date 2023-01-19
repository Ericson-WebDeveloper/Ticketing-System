<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class QACollectionTickets extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'control_no' => $this->control_no,
            'description' => $this->description,
            'ticket_name' => $this->ticket_name,
            'solution' => $this->solution,
            'root_cause' => $this->root_cause,
            'remarks' => $this->root_cause,
            'user_id' => $this->user_id,
            'qa_id' => $this->qa_id,
            'owner_id' => $this->owner_id,
            'progress' => [
                'id' => $this->progress->id,
                'env' => $this->progress->env,
                'type' => $this->progress->type,
                'status' => $this->progress->status
            ],
            'owner' => [
                'name' => $this->owner->name,
                'email' => $this->owner->email,
                'detail' => $this->owner->detail,
                'job' => $this->owner->job,
            ],
            'creator' => [
                'name' => $this->creator->name,
                'email' => $this->creator->email,
                'detail' => $this->creator->detail,
                'job' => $this->creator->job,
            ],
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at, 
          ];
    }
}
