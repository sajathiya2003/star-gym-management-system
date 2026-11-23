<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GymBooking;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class GymBookingController extends Controller
{
    // Fetch all bookings ✅
    public function index()
    {
        $bookings = GymBooking::all();

        return response()->json([
            'message' => 'Bookings fetched successfully',
            'data' => $bookings
        ]);
    }

    // Save booking + Send Email Notifications ✅
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|max:15', // ✅ Added Phone Validation
            'age' => 'required|integer|min:16|max:80',
            'gender' => 'required|string',
            'fitness_level' => 'required|string',
            'goals' => 'required|array|min:1',
            'medical_history' => 'nullable|string',
            'trainer_preference' => 'nullable|string',
            'workout_time' => 'required|string',
            'membership_plan' => 'required|string',
            'payment_amount' => 'required|string',
            'payment_method' => 'required|string',
        ]);

        // Convert goals array → JSON ✅
        $validated['goals'] = json_encode($validated['goals']);

        // Save booking ✅
        $booking = GymBooking::create($validated);

        // PHPMailer Email Sending ✅
        $mail = new PHPMailer(true);

        try {
            // SMTP Settings ✅
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'sakithiyajeyakanthan6@gmail.com'; // YOUR GMAIL
            $mail->Password = 'rqzb jlda kpbg uqwb'; // ✅ App Password
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;

            /* ✅ Email to Customer */
            $mail->setFrom('sakithiyajeyakanthan6@gmail.com', 'Star Strength Gym');
            $mail->addAddress($validated['email'], $validated['name']);
            $mail->isHTML(true);
            $mail->Subject = "✅ Welcome To Star Strength Gym!";
            $mail->Body = "
                <h2>Hello {$validated['name']}! ✅</h2>
                <p>Your gym membership booking is confirmed!</p>
                <p><strong>Plan:</strong> {$validated['membership_plan']}</p>
                <p><strong>Payment:</strong> ₹{$validated['payment_amount']} - {$validated['payment_method']}</p>
                <p><strong>Workout Time:</strong> {$validated['workout_time']}</p>
                <p><strong>Phone:</strong> {$validated['phone']}</p>
                <br>
                <p>🔥 We are excited to help you achieve your fitness goals 💪</p>
            ";
            $mail->send();

            /* ✅ Notification to Admin */
            $mail->clearAddresses();
            $mail->addAddress('admin@gmail.com', 'Gym Admin');
            $mail->Subject = "📢 New Booking Received!";
            $mail->Body = "
                <h3>New Member Registered!</h3>
                <p><strong>Name:</strong> {$validated['name']}</p>
                <p><strong>Email:</strong> {$validated['email']}</p>
                <p><strong>Phone:</strong> {$validated['phone']}</p>
                <p><strong>Plan:</strong> {$validated['membership_plan']}</p>
                <p><strong>Payment:</strong> ₹{$validated['payment_amount']} - {$validated['payment_method']}</p>
            ";
            $mail->send();

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Booking Saved ✅ Email Failed ❌',
                'error' => $e->getMessage()
            ], 500);
        }

        return response()->json([
            'message' => 'Booking Successful 🎉 Email Sent ✅',
            'data' => $booking
        ], 201);
    }
}
