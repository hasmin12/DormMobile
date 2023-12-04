<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Announcement;
use App\Models\User;
use Illuminate\Database\Eloquent\SoftDeletes;
use Auth;
class AnnouncementController extends Controller
{
    //
    public function index()
    {
        $data = Announcement::all();
        return response()->json($data);
    }

    public function store(Request $request)
    {
        // dd(Auth::user());
        if (auth()->check()) {
            $input = $request->all();
            $announcement = new Announcement();
            $announcement->title = $input['title'];
            $announcement->content = $input['content'];
            $announcement->postedBy = auth()->user()->name;
    
            $fileName = time() . $request->file('img_path')->getClientOriginalName();
            $path = $request->file('img_path')->storeAs('images', $fileName, 'public');
            $input["img_path"] = '/storage/' . $path;
            $announcement->img_path = $input["img_path"];
    
            $announcement->save();
    
            return response()->json([
                'message' => 'Announcement Created Successfully.',
                'status' => 200,
            ]);
        } else {
            return response()->json([
                'message' => 'Unauthorized. Please log in.',
                'status' => 401,
            ]);
        }
    }

    public function edit($id) {
        $announcement = Announcement::Find($id);
        return response()->json($announcement);
    }

    public function update(Request $request, $id)
    {
        $input = $request->all();
        $announcement = Announcement::find($id);
        // dd($announcement);
        $announcement->title = $input['title'];
        $announcement->content = $input['content'];
        $announcement->postedBy = auth()->user()->name;

        $fileName = time() . $request->file('img_path')->getClientOriginalName();
        $path = $request->file('img_path')->storeAs('images', $fileName, 'public');
        $input["img_path"] = '/storage/' . $path;
        $announcement->img_path = $input["img_path"];

        $announcement->save();

        return response()->json($announcement);
        //}
    } 

    public function destroy($id)
    {
        $announcement = Announcement::findOrFail($id);
        $announcement->delete();
        return response()->json(["success" => "Announcement deleted successfully.","status" => 200]);
    }
}