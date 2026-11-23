<?php

namespace App\Http\Controllers;

use App\Models\Progress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProgressController extends Controller
{
    // Save or create progress for a customer
    public function saveProgress(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'customer_id' => 'required|exists:customer_register,id', // Changed to customer_register
            'current_weight' => 'required|numeric|min:30|max:200',
            'target_weight' => 'required|numeric|min:30|max:200',
            'height' => 'required|numeric|min:100|max:250',
            'fitness_goal' => 'required|string|in:weight_loss,muscle_gain,maintenance',
            'activity_level' => 'required|string|in:sedentary,light,moderate,active,very_active',
            'weekly_workouts' => 'required|array|min:1',
            'diet_preference' => 'nullable|string|max:255',
            'medical_conditions' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $validated = $validator->validated();
            
            // Handle JSON field for weekly_workouts
            $validated['weekly_workouts'] = json_encode($validated['weekly_workouts']);

            $progress = Progress::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Progress saved successfully!',
                'data' => $progress
            ], 201);

        } catch (\Exception $e) {
            \Log::error('Progress save error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to save progress: ' . $e->getMessage()
            ], 500);
        }
    }

    // Get all progress entries for a customer
    public function getProgress($customerId)
    {
        try {
            $progress = Progress::where('customer_id', $customerId)->get();

            if ($progress->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No progress found for this customer.'
                ], 404);
            }

            // Decode JSON fields for response
            $progress->each(function ($item) {
                $item->weekly_workouts = json_decode($item->weekly_workouts, true);
            });

            return response()->json([
                'success' => true,
                'data' => $progress
            ]);

        } catch (\Exception $e) {
            \Log::error('Progress fetch error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch progress: ' . $e->getMessage()
            ], 500);
        }
    }

    // Delete a specific progress entry by its ID
    public function deleteProgress($id)
    {
        try {
            $progress = Progress::find($id);

            if (!$progress) {
                return response()->json([
                    'success' => false,
                    'message' => 'Progress entry not found.'
                ], 404);
            }

            $progress->delete();

            return response()->json([
                'success' => true,
                'message' => 'Progress deleted successfully.'
            ]);

        } catch (\Exception $e) {
            \Log::error('Progress delete error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete progress: ' . $e->getMessage()
            ], 500);
        }
    }

    // Update progress entry
    public function updateProgress(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'current_weight' => 'sometimes|numeric|min:30|max:200',
            'target_weight' => 'sometimes|numeric|min:30|max:200',
            'height' => 'sometimes|numeric|min:100|max:250',
            'fitness_goal' => 'sometimes|string|in:weight_loss,muscle_gain,maintenance',
            'activity_level' => 'sometimes|string|in:sedentary,light,moderate,active,very_active',
            'weekly_workouts' => 'sometimes|array|min:1',
            'diet_preference' => 'nullable|string|max:255',
            'medical_conditions' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $progress = Progress::find($id);

            if (!$progress) {
                return response()->json([
                    'success' => false,
                    'message' => 'Progress entry not found.'
                ], 404);
            }

            $validated = $validator->validated();
            
            // Handle JSON field for weekly_workouts if provided
            if (isset($validated['weekly_workouts'])) {
                $validated['weekly_workouts'] = json_encode($validated['weekly_workouts']);
            }

            $progress->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Progress updated successfully!',
                'data' => $progress
            ]);

        } catch (\Exception $e) {
            \Log::error('Progress update error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update progress: ' . $e->getMessage()
            ], 500);
        }
    }
}