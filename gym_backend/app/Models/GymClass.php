<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GymClass extends Model
{
    protected $fillable = [
        'name',
        'description',
        'instructor',
        'category',
        'level',
        'time',
        'duration',
        'capacity',
        'image_url',
        'rating'
    ];
}