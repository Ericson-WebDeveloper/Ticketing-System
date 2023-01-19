<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateNewUserRequest extends FormRequest
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
            'name' => 'required',
            'email' => 'required',
            'password' => 'required|min:6',
            'job_id' => 'required',
            'role_id' => 'required',
            'employee_no' => 'required',
            'nickname' => 'required',
            'image' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'job_id.required' => 'The Job is required',
            'role_id.required' => 'The Role is required',
            'employee_no.required' => 'The Employee Number is required'
        ];
    }
}
