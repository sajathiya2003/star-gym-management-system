<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // ================== REGISTER ==================
    public function register(Request $request)
    {
        $request->validate([
            'name'            => 'required|string|max:255',
            'email'           => 'required|string|email|unique:users',
            'username'        => 'required|string|unique:users',   // 🔑 username add pannuren
            'password'        => 'required|string|min:6|confirmed',
            'phone'           => 'required|string|max:15',
            'age'             => 'required|integer|min:16|max:80',
            'gender'          => 'required|string',
            'fitness_goal'    => 'required|string',
            'experience'      => 'required|string',
            'membership_type' => 'required|string',
            'referral_code'   => 'nullable|string',
            'role'            => 'required|string|in:admin,customer,trainer' // 🔑 role add pannuren
        ]);

        $user = User::create([
            'name'            => $request->name,
            'email'           => $request->email,
            'username'        => $request->username,  // 🔑 username save
            'password'        => Hash::make($request->password),
            'phone'           => $request->phone,
            'age'             => $request->age,
            'gender'          => $request->gender,
            'fitness_goal'    => $request->fitness_goal,
            'experience'      => $request->experience,
            'membership_type' => $request->membership_type,
            'referral_code'   => $request->referral_code,
            'role'            => $request->role, // 🔑 admin/customer/trainer
        ]);

        return response()->json([
            'message' => 'User registered successfully',
            'user'    => $user
        ], 201);
    }

    // ================== LOGIN ==================
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',   // 🔑 login with username
            'password' => 'required|string',
            'role'     => 'required|string|in:admin,customer,trainer' // 🔑 role check
        ]);

        $user = User::where('username', $request->username)
                    ->where('role', $request->role) // role must match
                    ->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials or role mismatch'], 401);
        }

        return response()->json([
            'message' => 'Login successful',
            'user'    => $user
        ], 200);
    }
}
