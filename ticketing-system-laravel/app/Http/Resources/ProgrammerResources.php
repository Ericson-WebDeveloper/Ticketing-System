<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProgrammerResources extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'job' => [
                'id' => $this->job->id,
                'name' => $this->job->name
            ],
            'detail' => [
                'id' => $this->detail->id ?? '',
                'nickname' => $this->detail->nickname ?? '',
                'employee_no' => $this->detail->employee_no ?? '',
                'profile_img' => $this->detail->profile_img ?? ''
            ],
            'roles' => RolesResource::collection($this->roles)
        ];
    }
}
