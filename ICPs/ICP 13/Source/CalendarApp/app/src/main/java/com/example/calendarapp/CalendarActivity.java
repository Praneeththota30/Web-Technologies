package com.example.calendarapp;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.provider.CalendarContract;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.Menu;
import android.widget.CalendarView;
import android.widget.TextView;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class CalendarActivity extends AppCompatActivity {

    private static final String TAG="CalendarActivity";
    private CalendarView mCalendarView;
    private TextView dateview;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.calendar_layout);
        mCalendarView = (CalendarView) findViewById(R.id.calendarView);
        dateview = (TextView) findViewById(R.id.textView);

        Calendar c = Calendar.getInstance();
        SimpleDateFormat ss = new SimpleDateFormat("dd-MM-yyyy");
        Date date = new Date();
        String currentdate = ss.format(date);

        dateview.setText(currentdate);
        mCalendarView.setOnDateChangeListener(new CalendarView.OnDateChangeListener() {
            @Override
            public void onSelectedDayChange(CalendarView calendarView, int i, int i1, int i2) {
                String date = i2 + "/" + (i1 + 1) + "/" + i;
                Log.d("", date);
                dateview.setText(date);
                //Intent intent = new Intent(CalendarActivity.this,MainActivity.class);
                // intent.putExtra("date",date);
                //startActivity(intent);
                insert(date);
            }
        });
    }

        @SuppressLint("NewApi")
        public void insert(String date) {
            Intent intent = new Intent(Intent.ACTION_INSERT,
                    CalendarContract.Events.CONTENT_URI);
            // Add the calendar event details
            intent.putExtra(CalendarContract.Events.TITLE, "Launch!");
            intent.putExtra(CalendarContract.Events.DESCRIPTION,
                    "Learn Java Android Coding");
            intent.putExtra(CalendarContract.Events.EVENT_LOCATION,
                    "UMKC.com");
            String[] s=date.split("/");
            Calendar startTime = Calendar.getInstance();
            startTime.set(Integer.valueOf(s[2]), Integer.valueOf(s[1])-1, Integer.valueOf(s[0]));
            intent.putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME,
                    startTime.getTimeInMillis());
            intent.putExtra(CalendarContract.EXTRA_EVENT_ALL_DAY, true);
            // Use the Calendar app to add the new event.
            startActivity(intent);
        }

        /*
        @Override
        public boolean onCreateOptionsMenu(Menu menu) {
            // Inflate the menu; this adds items to the action bar if it is present.
            getMenuInflater().inflate(R.menu.main, menu);
            return true;
        }
        */

}
