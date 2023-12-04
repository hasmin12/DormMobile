<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Laundryschedule extends Model
{
    use HasFactory;
    use softDeletes;

    public static $rules = [
        'user_id' => 'required',
        // 'method' => 'required',
        'laundrydate' => 'required',
        // 'minitial' => 'required',
        'laundrytime' => 'required',
        'status' => 'required',
       
    ];
}