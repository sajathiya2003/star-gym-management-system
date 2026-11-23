<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GymBooking extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email', // ✅ New field
        'phone', // ✅ New field
        'age',
        'gender',
        'fitness_level',
        'goals',
        'medical_history',
        'trainer_preference',
        'workout_time',
        'membership_plan',
        'payment_amount',
        'payment_method',
    ];

    protected $casts = [
        'goals' => 'array',
    ];
}
