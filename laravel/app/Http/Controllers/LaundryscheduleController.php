<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Laundryschedule;
use App\Models\User;
use Auth;
class LaundryscheduleController extends Controller
{
    //
    public function index()
     {
         $data = Laundryschedule::all();
         return response()->json($data);
     }
 
     public function store(Request $request)
     {
 
         $input = $request->all();
         $Laundryschedule = new Laundryschedule();
         $Laundryschedule->user_id = Auth::id();
 
         $Laundryschedule->laundrydate = $input['laundrydate'];
         $Laundryschedule->laundrytime = $input['laundrytime'];
         $Laundryschedule->status = "Scheduled";
         $Laundryschedule->save();
        
 
         // return response($message = 'User Successfully Created', $status = 200);
         return response()->json(['message' => 'Laundryschedule Created Successfully.',
             'Laundryschedule' => $Laundryschedule,
             'status' => 200,
         ]);
     }
 
     public function edit($id) {
         $Laundryschedule = Laundryschedule::Find($id);
         return response()->json($Laundryschedule);
     }
 
     public function update(Request $request, $id)
     {
       
         $Laundryschedule = Laundryschedule::find($id);
         // dd($Laundryschedule);
         $Laundryschedule = $Laundryschedule->update($request->all());
         return response()->json($Laundryschedule);
         //}
     } 
 
     public function destroy($id)
     {
         $Laundryschedule = Laundryschedule::findOrFail($id);
         $Laundryschedule->delete();
         return response()->json(["success" => "Laundryschedule deleted successfully.","status" => 200]);
     }
}