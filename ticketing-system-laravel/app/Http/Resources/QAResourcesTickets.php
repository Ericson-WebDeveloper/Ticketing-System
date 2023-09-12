<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Controllers\Api\V1\PaginateResourceResponseExtended;
use App\Http\Controllers\Helper\HelperController;
use Illuminate\Http\Resources\Json\ResourceCollection;

class QAResourcesTickets extends ResourceCollection
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // return ['data' => $this->collection];
        $helpercontrol = new HelperController;
        // https://laravel.com/docs/9.x/pagination for  more info about getting function of paginate
        $links = $helpercontrol->generateLinks($this->getUrlRange(1, $this->lastPage()), $this->url($this->currentPage()));
        $prev = $helpercontrol->generatePrevLink($this->previousPageUrl(), $this->url($this->currentPage()));
        $nxt = $helpercontrol->generateNxtLink($this->nextPageUrl(), $this->url($this->currentPage()));
        return [
            'data' => QACollectionTickets::collection($this->collection),
            'links' => [$prev, ...$links, $nxt],
            'current_page' => $this->currentPage(),
            'from' => $this->firstItem(),
            'last_page' => $this->lastPage(),
            'path' => $this->getOptions()['path'],
            'per_page' => $this->perPage(),
            'to' => $this->lastItem(),
            'total' => $this->total(),
            'first_page_url' => $this->url(1),
            'last_page_url' => $this->url($this->lastPage()),
            'next_page_url' => $this->nextPageUrl(),
            'prev_page_url' => $this->previousPageUrl()
        ];
    }

}
