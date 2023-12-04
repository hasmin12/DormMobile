<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Auth;
use Log;


use Illuminate\Database\Eloquent\SoftDeletes;

class UserController extends Controller
{
    //
    public function index()
    {
        if(Auth::user()->branch === "Dormitory"){
            $data = User::where('role',"Resident")->where('status',"Member")->where('branch',"Dormitory")->get();
        }
        else{
            $data = User::where('role',"Resident")->where('status',"Member")->where('branch',"Hostel")->get();
        }
        return response()->json($data);
    }

    public function getResidents()
    {
        if(Auth::user()->branch === "Dormitory"){
            $data = User::where('role',"Resident")->where('status',"Member")->where('branch',"Dormitory")->get();
        }
        else{
            $data = User::where('role',"Resident")->where('status',"Member")->where('branch',"Hostel")->get();
        }
        return response()->json($data);
    }

    public function getAdmins()
    {
        $data = User::where('role',"Admin")->get();
        return response()->json($data);
    }

    public function getPendingUsers()
    {
        $data = User::where('role',"Resident")->where('status',"Pending User")->get();
        return response()->json($data);
    }

    // public function createResident(Request $request)
    // {

    //     $input = $request->all();
        

    //     // Encrypt password
    //     // $input['password'] = bcrypt($request->password);

    //     $user = new User();
    //     $user->name = $input['fname'] . ' ' . $input['lname'];
    //     $user->email = $input['email'];
    //     $user->password = bcrypt($request->password);
    //     $user->role = 'Resident';
    
    
    //     $user->Tuptnum = $input['Tuptnum'];
  
    //     $user->address = $input['address'];
    //     $user->gender = $input['gender'];
    //     $user->birthdate = $input['birthdate'];
    //     $user->contacts = $input['contacts'];
    //     $user->save();

    //     return response()->json(['message' => 'Resident Created Successfully.',
    //         'user' => $user,
    //         'status' => 200,
    //     ]);
    // }

    public function store(Request $request)
    {
        $input = $request->all();
        $user = new User();
        $user->name = $input['fname'] . ' ' . $input['lname'];
        $user->email = $input['email'];
        $user->password = bcrypt($request->password);
        $user->role = $input['role'];
  
        $user->Tuptnum = $input['Tuptnum'];
  
        $user->address = $input['address'];
        $user->gender = $input['gender'];
        $user->birthdate = $input['birthdate'];
        $user->contacts = $input['contacts'];
        $user->save();

        return response()->json(['message' => 'User Created Successfully.',
            'user' => $user,
            'status' => 200,
        ]);
    }


    public function edit($id) {
        $user = User::Find($id);
        return response()->json($user);
    }

   

    public function update(Request $request, $id)
    {
        try {
            // Log the FormData
            Log::info('Received entire request for user update:', [
                'user_id' => $id,
                'request_data' => $request->all(),
                'raw_content' => $request->getContent(),
            ]);
            Log::info(json_encode($request->all())); 

            $user = User::find($id);

            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            // Instead of $request->all(), use specific methods to access fields
            $user->update([
                'Tuptnum' => $request->input('Tuptnum'),
                'name' => $request->input('fname') .' '. $request->input('lname'),
                'address' => $request->input('address'),
                'sex' => $request->input('sex'),
                'contacts' => $request->input('contacts'),
                'birthdate' => $request->input('birthdate'),
                // Add other fields as needed
            ]);

            return response()->json(['message' => 'User updated successfully', 'data' => $user]);
        } catch (\Exception $e) {
            Log::error('Error updating user:', [
                'user_id' => $id,
                'error' => $e->getMessage(),
            ]);

            return response()->json(['error' => 'Error updating user'], 500);
        }
    }

    public function updateMobile(Request $request, $id)
    {
        try {
            // Log the FormData
            Log::info('Received entire request for user update:', [
                'user_id' => $id,
                'request_data' => $request->all(),
                'raw_content' => $request->getContent(),
            ]);
            Log::info(json_encode($request->all())); 

            $user = User::find($id);

            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            // Instead of $request->all(), use specific methods to access fields
            $user->update([
                'Tuptnum' => $request->input('Tuptnum'),
                'name' => $request->input('name'),
                'address' => $request->input('address'),
                'sex' => $request->input('sex'),
                'contacts' => $request->input('contacts'),
                'birthdate' => $request->input('birthdate'),
                // Add other fields as needed
            ]);

            return response()->json(['message' => 'User updated successfully', 'data' => $user]);
        } catch (\Exception $e) {
            Log::error('Error updating user:', [
                'user_id' => $id,
                'error' => $e->getMessage(),
            ]);

            return response()->json(['error' => 'Error updating user'], 500);
        }
    }


    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(["success" => "User deleted successfully.","status" => 200]);
    }
}