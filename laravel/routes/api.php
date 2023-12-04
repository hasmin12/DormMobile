<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['middleware' => ['auth:sanctum']], function(){

Route::get('getAnnouncement','DashboardController@getAnnouncement');
Route::resource('announcement', AnnouncementController::class);
Route::post('announcement/{id}','AnnouncementController@update');

Route::resource('user', UserController::class);
Route::get('getResidents','UserController@getResidents');

Route::post('user/{id}','UserController@updateMobile');
});
Route::post('signinDorm', 'AuthController@signinDorm');
Route::post('signinHostel', 'AuthController@signinHostel');

Route::post('signout', 'AuthController@signout')->name('apiSignout');
