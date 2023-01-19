<?php

namespace App\Http\Controllers\Helper;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Closure;

class HelperController extends Controller
{
    // assign role
    //  store image
    //  response


    public function storeImage($request, $foldername) 
    {
        try {
            $extension = $request->image->extension();
            $path = Storage::put("public/$foldername", $request->image);
            if(!$path) {
                return response()->json(['error' => 'uploading image is failed'], 400);
            }
            return $path;
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function assignRole($role, $user)
    {
        $user->assignRole($role);
    }

    public function returnResponse(array $arrayMessage, int $code)
    {
        return response()->json($arrayMessage, $code);
    }

    public function checkingExpireSecond($date, int $seconds)
    {
        $diffSeconds = Carbon::now()->diffInSeconds($date);
        if(intval($diffSeconds) >= $seconds) {
            return false;
            // return $this->returnResponse(['error' => 'Expired Token. Please Request new Password Reset'], 400);
        } 

        return true;
    }

    public function isAllowedEditByOwnerShip($request, $ticket)
    {
        $job = $request->user()->job->name;
        if($job == 'Q.A') {
            return $request->user()->isQA($ticket);
        }

        if($job == 'Programmer') {
            return $request->user()->isOwner($ticket);
        }
    }

    public function generatePrevLink($url, $activeUrl) {
        return [
            'active' => $url == $activeUrl ? true : false,
            'label' => "&laquo; Previous",
            'url'=> $url ? $url : null
        ];
    }

    public function generateNxtLink($url, $activeUrl) {
        return [
            'active' => $url == $activeUrl ? true : false,
            'label' => "Next &raquo;",
            'url'=> $url ? $url : null
        ];
    }


    public function generateLinks($links, $activeUrl) {
        return collect($links)->map(function($url) use ($activeUrl) {
            return [
                'active' => $activeUrl  == $url ? true : false,
                'label' => explode('=', $url)[1],
                'url'=> $url
            ];
        });
    }
}
