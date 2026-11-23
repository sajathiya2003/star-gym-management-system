<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Progress extends Model
{
    use HasFactory;

    protected $table = 'progress';

    protected $fillable = [
        'customer_id',
        'current_weight',
        'target_weight',
        'height',
        'fitness_goal',
        'activity_level',
        'weekly_workouts',
        'diet_preference',
        'medical_conditions'
    ];

    protected $casts = [
        'weekly_workouts' => 'array', // Automatically cast JSON to array
    ];

    public function customer()
    {
        return $this->belongsTo(CustomerRegister::class, 'customer_id');
    }
}
