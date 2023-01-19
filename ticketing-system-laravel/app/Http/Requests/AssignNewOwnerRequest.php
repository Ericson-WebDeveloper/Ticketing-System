<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AssignNewOwnerRequest extends FormRequest
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
            'programmer_id' => 'required',
            'qa_id' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'programmer_id.required' => 'The Programmer field is required',
            'qa_id.required' => 'The QA field is required'
        ];
    }
}
