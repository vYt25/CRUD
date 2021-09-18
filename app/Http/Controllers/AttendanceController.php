<?php

namespace App\Http\Controllers;

use App\Models\Shift;
use App\Models\Attendance;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $req)
    {
        return [
            "shift" => Shift::where('deleted_at', null)->get(),
            "attendance" => Attendance::select('*', DB::raw('TIMEDIFF(time_out,time_in) as elapsed'))->where('deleted_at', null)->orderBy('id', 'DESC')->get(),
            'time_in_flag' => Attendance::where(DB::raw('DATE(time_in)'), $req->date)->count(),
            'time_out_flag' => Attendance::where(DB::raw('DATE(time_out)'), $req->date)->count(),
            'settings' => Setting::where('deleted_at', null)->get()
        ];
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $req)
    {

        $obj = $req->action == 'time_in' ? new Attendance : Attendance::find($req->id);
        $obj->shift_id = $req->shift_id;
        $obj->{$req->action} = $req->{$req->action};
        $obj->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $req, $id)
    {
        $settings = $req->input();
        foreach ($settings as $key => $val) {
            $val = (object)$val;
            $obj = Setting::where('name', $key)->first();
            $obj->before = $val->before;
            $obj->after = $val->after;
            $obj->save();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
