<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Auth;
use View;
use Hash;
use Log;
class AuthController extends Controller
{
    //
    
    public function signin(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if (Auth::attempt($credentials)) {
            $user = Auth::user(); // Retrieve the authenticated user
            // dd($user);
            $token = $user->createToken('remember_token')->plainTextToken;
            return response()->json([
                'success' => true,
                'token' => $token,
                'Type' => 'Bearer',
                'role' => $user->role, // include user role in response
                'user' => $user,
            ]);
        }
        return response([
            'message' => 'Wrong credentials'
        ]); 
    }

    public function signinDorm(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        // Log::info(json_encode($request->all())); 
        $user = User::where('email', $credentials['email'])->first();
        // Log::info($user); 

        if ($user->branch === "Dormitory" && Auth::attempt($credentials)) {
            $token = $user->createToken('remember_token')->plainTextToken;
            // Log::info($token); 

            return response()->json([
                'success' => true,
                'data' => [
                    'token' => $token,
                    'type' => 'Bearer',
                    'role' => $user->role,
                    'user' => $user,
                ],
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Invalid credentials or branch for dormitory access',
        ], 401);
    }

    public function signinHostel(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        $user = User::where('email', $credentials['email'])->first();

        if ($user && $user->branch === 'Hostel' && Auth::attempt($credentials)) {
            $token = $user->createToken('remember_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'data' => [
                    'token' => $token,
                    'type' => 'Bearer',
                    'role' => $user->role,
                    'user' => $user,
                ],
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Invalid credentials or branch for dormitory access',
        ], 401);
    }
    


    public function signout(Request $request)
    {
        Auth::logout();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function getUser()
    {
        $user = auth()->user();
    
        if ($user) {
            return response()->json(['user' => $user]);
        } else {
            return response()->json(['error' => 'User not authenticated'], 401); 
        }
    }

    
    

}