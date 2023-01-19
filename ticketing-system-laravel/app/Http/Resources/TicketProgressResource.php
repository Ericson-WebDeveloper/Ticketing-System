<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TicketProgressResource extends JsonResource
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
            'env' => [
                'id' => $this->env->id,
                'environment_name' => $this->env->environment_name
            ],
            'status' => [
                'id' => $this->status->id,
                'status_name' => $this->status->status_name
            ],
            'type' => [
                'id' => $this->type->id,
                'type_name' => $this->type->type_name
            ],
        ];
    }
}
