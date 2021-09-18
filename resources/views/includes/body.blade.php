<div class="container my-5">
    <button class="btn btn-sm btn-link timeIn-settings">Edit Settings</button>
    <div class="row">
        <div class="col-sm-6">
            <div class="col-sm-12">
                Time In Settings:  
            </div>
            <div class="col-sm-12">
                Before Shift Start:  <span class="timeIn-start"></span>
            </div>
            <div class="col-sm-12">
                After Shift Start:  <span class="timeIn-end"></span>
            </div>                
        </div>
        <div class="col-sm-6">
            <div class="col-sm-12">
                Time Out Settings:
            </div>
            <div class="col-sm-12">
                Before Shift End: <span class="timeOut-start"></span>
            </div>
            <div class="col-sm-12">
                After Shift End: <span class="timeOut-end"></span>
            </div>
        </div>
        <div class="col-sm-12 my-3" >
            Schedule Shifts
            <div class="row shift-segment">
            </div>
        </div>
        <div class="col-sm-12 my-3" >
            Activity                        
            <div class="row">
                <div class="col-sm-6  gap-1">
                    <button type="button" class="btn btn-success btn-timeIn disabled" autocomplete="off">Time IN</button>
                    <button type="button" class="btn btn-danger btn-timeOut disabled" autocomplete="off">Time OUT</button>
                </div>
                <div class="col-sm-6 my-3" >
                    <div class="row">
                        <div class="col-sm-4"></div>
                        <div class="col-sm-4">Date: <input class="form-control input-date" type="date"></div>
                        <div class="col-sm-4">Time: <input class="form-control input-time" type="text"></div>
                    </div>
                </div>                    
            </div>
        </div>
        <hr>
        <h3>Attendance</h3>
        <div class="container">
            <table class="table table-bordered">
                <thead class="bg-secondary text-light">
                    <tr>
                        <th>Date</th>
                        <th>Shift</th>
                        <th>Time IN</th>
                        <th>Time Out</th>
                        <th>Elapsed</th>
                    </tr>
                </thead>
                <tbody class="attendance-segment">                        
                </tbody>
            </table>
        </div>
    </div>
</div>
{{-- MODAL --}}
<div class="modal fade" id="settingsDialog" tabindex="-1" aria-labelledby="settingsDialogLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="dialog-title">Settings</h5>
        </div>
        <div class="modal-body">
            <div class="col-sm-12">
                TimeIn(Minutes)
                <div class="row">
                <div class="col-sm-3 text-right">Before</div>
                <div class="col-sm-9">
                    <input type="text" class="form-control input-before-timeIn" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');">
                </div>
                <div class="col-sm-3 text-right">After</div>
                <div class="col-sm-9">
                    <input type="text" class="form-control input-after-timeIn" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');">
                </div>
            </div>
            </div>
            <div class="col-sm-12">
                TimeOut(Minutes)
                <div class="row">
                    <div class="col-sm-3 text-right">Before</div>
                    <div class="col-sm-9">
                        <input type="text" class="form-control input-before-timeOut" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');">
                    </div>
                    <div class="col-sm-3 text-right">After</div>
                    <div class="col-sm-9">
                        <input type="text" class="form-control input-after-timeOut" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');">
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success btn-sm btn-saveSettings" >Save</button>
          <button type="button" class="btn btn-danger btn-sm" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>