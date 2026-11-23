<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GymClass;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ClassesController extends Controller
{
    public function index()
    {
        return GymClass::all();
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'instructor' => 'required|string|max:255',
            'category' => 'required|string|in:yoga,strength,cardio,dance,pilates,martial',
            'level' => 'required|string|in:BEGINNER,INTERMEDIATE,ADVANCED,ALL LEVELS',
            'time' => 'required|string',
            'duration' => 'required|string',
            'capacity' => 'required|integer|min:1',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'rating' => 'required|numeric|min:0|max:5'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Handle file upload
            $imagePath = $request->file('image')->store('public/class-images');
            $imageUrl = Storage::url($imagePath);

            // Create class with image URL
            $class = GymClass::create([
                'name' => $request->name,
                'description' => $request->description,
                'instructor' => $request->instructor,
                'category' => $request->category,
                'level' => $request->level,
                'time' => $request->time,
                'duration' => $request->duration,
                'capacity' => $request->capacity,
                'image_url' => $imageUrl,
                'rating' => $request->rating
            ]);

            return response()->json($class, 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create class',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}