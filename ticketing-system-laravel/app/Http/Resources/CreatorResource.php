<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CreatorResource extends JsonResource
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
            'email' => $this->email,
            'name' => $this->name,
            'job' => [
                'id' => $this->job->id,
                'name' => $this->job->name
            ],
            'detail' => [
                'nickname' => $this->detail->nickname,
                'employee_no' => $this->detail->employee_no,
                'profile_img' => $this->detail->profile_img,
            ]
        ];
    }
}
