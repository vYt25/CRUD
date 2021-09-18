let sessionData = {};

$(document).ready(() => {
    initialize();

    $(document).on('blur', '.input-date', function () {
        sessionData.date = $(this).val();
        initialize()
    })

    $(document).on('blur', '.input-time', function () {
        sessionData.time = $(this).val();
        getTime()
    })

    $(document).on('click', '.btn-saveSettings', function () {
        let toUpdate = {
            time_in: {
                before: $('.input-before-timeIn').val(),
                after: $('.input-after-timeIn').val()
            },
            time_out: {
                before: $('.input-before-timeOut').val(),
                after: $('.input-after-timeOut').val()
            }
        }
        $.ajax({
            url: 'api/Attendance/all',
            data: JSON.stringify(toUpdate),
            type: 'PATCH',
            contentType: 'application/json'
        }).done((data, textStatus, jqXHR) => {
            initialize()
            alert('Saved')
            $('#settingsDialog').modal('hide');
        });
    })

    $(document).on('click', '.timeIn-settings', function () {
        $('#settingsDialog').modal('show');
        let timeIn = sessionData.settings[sessionData.settings.findIndex(rec => rec.name == 'time_in')]
        let timeOut = sessionData.settings[sessionData.settings.findIndex(rec => rec.name == 'time_out')]
        $('.input-before-timeIn').val(timeIn.before)
        $('.input-after-timeIn').val(timeIn.after)
        $('.input-before-timeOut').val(timeOut.before)
        $('.input-after-timeOut').val(timeOut.after)
    })


    $(document).on('click', '.btn-timeOut', function () {
        let toSave = {
            id: sessionData.attendance[0].id,
            shift_id: sessionData.shift[sessionData.selectedShiftIndex].shift_id,
            time_out: `${sessionData.date} ${sessionData.time}`,
            action: 'time_out'
        }
        $.post('/api/Attendance', toSave)
            .done((data, textStatus, jqXHR) => {
                alert('Success')
                initialize()
            })
    })

    $(document).on('click', '.btn-timeIn', function () {
        let toSave = {
            id: null,
            shift_id: sessionData.shift[sessionData.selectedShiftIndex].shift_id,
            time_in: `${sessionData.date} ${sessionData.time}`,
            action: 'time_in'
        }
        $.post('/api/Attendance', toSave)
            .done((data, textStatus, jqXHR) => {
                alert('Success')
                initialize()
            })
    })

    $(document).on('click', '.input-shift', function () {

        $(".btn-timeOut").addClass('disabled')
        $(".btn-timeIn").addClass('disabled')

        sessionData.selectedShiftIndex = $(this).data('index')


        $(".input-shift").removeClass().addClass("input-shift btn btn-secondary");
        $(".input-shift").eq(sessionData.selectedShiftIndex).removeClass('bg-secondary').addClass('active').addClass('bg-info')

        getTime()

    })
});

let getTime = () => {
    sessionData.date = $('.input-date').val()
    sessionData.time = $('.input-time').val()
    if (sessionData.date && sessionData.time) {

        let beforeDateTime = ""
        let afterDateTime = ""

        let timeIn = sessionData.settings[sessionData.settings.findIndex(rec => rec.name == 'time_in')]
        let timeOut = sessionData.settings[sessionData.settings.findIndex(rec => rec.name == 'time_out')]
        if (sessionData.time_in_flag == 0) {
            if (sessionData.selectedShiftIndex >= 0) {
                let timeInDateTime = moment(`${sessionData.date} ${sessionData.shift[sessionData.selectedShiftIndex].shift_start}`)
                beforeDateTime = timeInDateTime.subtract(parseInt(timeIn.before), 'minutes').format('YYYY-MM-DD HH:mm:ss')
                afterDateTime = timeInDateTime.add((parseInt(timeIn.before) + parseInt(sessionData.settings[0].after)), 'minutes').format('YYYY-MM-DD HH:mm:ss')
            }
        }

        if (sessionData.time_in_flag == 1) {
            let timeInShiftIndex = sessionData.shift.findIndex(rec => rec.shift_id == sessionData.attendance[0].shift_id)
            console.log(timeInShiftIndex, sessionData.selectedShiftIndex)
            if (sessionData.selectedShiftIndex == timeInShiftIndex) {
                let timeOutDateTime = moment(`${sessionData.date} ${sessionData.shift[sessionData.selectedShiftIndex].shift_end}`)
                beforeDateTime = timeOutDateTime.subtract(parseInt(timeOut.before), 'minutes').format('YYYY-MM-DD HH:mm:ss')
                afterDateTime = timeOutDateTime.add((parseInt(timeOut.before) + parseInt(timeOut.after)), 'minutes').format('YYYY-MM-DD HH:mm:ss')
            }
        }


        let checkDate = moment(`${sessionData.date} ${sessionData.time}`).isBetween(beforeDateTime, afterDateTime)

        if (checkDate && !sessionData.time_in_flag) {
            $(".btn-timeIn").removeClass('disabled')
            $(".btn-timeOut").addClass('disabled')
        } else if (checkDate && sessionData.time_in_flag && !sessionData.time_out_flag) {
            $(".btn-timeIn").addClass('disabled')
            $(".btn-timeOut").removeClass('disabled')
        } else {
            $(".btn-timeIn").addClass('disabled')
            $(".btn-timeOut").addClass('disabled')
        }

    }
}

let renderSettings = (settings) => {
    let timeIn = settings[settings.findIndex(rec => rec.name == 'time_in')]
    let timeOut = settings[settings.findIndex(rec => rec.name == 'time_out')]
    $('.timeIn-start').text(`${timeIn.before} minutes`)
    $('.timeIn-end').text(`${timeIn.after} minutes`)
    $('.timeOut-start').text(`${timeOut.before} minutes`)
    $('.timeOut-end').text(`${timeOut.after} minutes`)
}


let initialize = () => {
    sessionData.date = $('.input-date').val();
    sessionData.time = $('.input-time').val();
    $.ajax(`/api/Attendance?date=${sessionData.date}`,
        {
            success: (data, status, xhr) => {
                renderShifts(data.shift)
                renderAttendance(data.attendance)
                renderSettings(data.settings)
                sessionData = data
                $(".btn-timeOut").addClass('disabled')
                $(".btn-timeIn").addClass('disabled')
            },
            error: (jqXhr, textStatus, errorMessage) => {
                console.log(errorMessage)
            }
        });

}


let renderShifts = (shifts) => {
    $(".shift-segment").empty()
    shifts.forEach((rec, index) => {
        $('.shift-segment').append(`
            <div class="col-sm-4 d-grid gap-1">
                <button type="button" class="input-shift btn btn-secondary" data-bs-toggle="button" data-index="${index}" autocomplete="off">Shift ${rec.shift_id} ${rec.shift_start} - ${rec.shift_end}</button >
            </div >
        `);
    });
}

let renderAttendance = (attendance) => {
    $(".attendance-segment").empty()
    if (attendance.length == 0) {
        $('.attendance-segment').append(`
            <tr>
                <td colspan="5" class="text-center">No Data</td>
            </tr >
        `);
    } else {

        attendance.forEach(rec => {
            $('.attendance-segment').append(`
                <tr>
                    <td>${rec.time_in.split(' ')[0]}</td>
                    <td>${rec.shift_id}</td>
                    <td>${rec.time_in}</td>
                    <td>${!rec.time_out ? "" : rec.time_out}</td>
                    <td>${!rec.elapsed ? "" : rec.elapsed}</td>
                </tr>
    `);
        });
    }
}

let renderDateTime = (date, time) => {
    sessionData.date = date
    sessionData.time = time
    $('.input-date').val(sessionData.date);
    $('.input-time').val(sessionData.time);

}