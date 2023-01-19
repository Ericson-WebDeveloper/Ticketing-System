<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OpenTicketUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'ticket_name' => 'required',
            'control_no' => 'required',
            'description' => 'required',
            'status_id' => 'required',
            'environment_id' => 'required',
            'type_id' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'status_id.required' => 'The status ticket field is required',
            'environment_id.required' => 'The environment ticket field is required',
            'type_id.required' => 'The type ticket field is required'
        ];
    }
}
