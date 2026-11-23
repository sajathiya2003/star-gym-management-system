<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\CustomerRegister;

class CustomerRegisterController extends Controller
{
    // ===============================
    // ✅ Customer Registration
    // ===============================
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:customer_register,email',
            'phone' => 'nullable|string|max:15',
            'age' => 'nullable|integer|min:16|max:80',
            'gender' => 'nullable|string',
            'password' => 'required|string|min:6|confirmed', // matches password_confirmation
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $customer = CustomerRegister::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'age' => $request->age,
            'gender' => $request->gender,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'success' => true,
            'message' => '🎉 Registration successful!',
            'data' => $customer
        ]);
    }

    // ===============================
    // ✅ Customer Login
    // ===============================
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials!',
                'errors' => $validator->errors()
            ], 422);
        }

        $customer = CustomerRegister::where('email', $request->email)->first();

        if (!$customer) {
            return response()->json([
                'success' => false,
                'message' => 'Email not registered! Please register first.'
            ]);
        }

        if (!Hash::check($request->password, $customer->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Incorrect password! Please try again.'
            ]);
        }

        // Successful login
        return response()->json([
            'success' => true,
            'message' => 'Login Successful! Welcome back to STAR GYM!',
            'data' => $customer
        ]);
    }

    // ===============================
    // ✅ Fetch All Customers (for Profile Page)
    // ===============================
    public function getAllCustomers()
    {
        $customers = CustomerRegister::all();

        if ($customers->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No customers found!',
                'data' => []
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Customer list fetched successfully!',
            'data' => $customers
        ]);
    }
}
