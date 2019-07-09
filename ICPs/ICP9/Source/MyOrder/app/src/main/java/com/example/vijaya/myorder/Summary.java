package com.example.vijaya.myorder;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class Summary extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_summary);


        TextView sum = (TextView)findViewById(R.id.sum);
        final String summary = getIntent().getStringExtra("SUMMARY");
        final String Name = getIntent().getStringExtra("NAME");
        sum.setText(getIntent().getStringExtra("SUMMARY"));
        Button or_btn = (Button)findViewById(R.id.or_sum);
        or_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String recipientList = "shankarpentyala@gmail.com";

                String subject  = Name;

                Intent intent = new Intent(Intent.ACTION_SEND);
                intent.putExtra(Intent.EXTRA_EMAIL,recipientList);
                intent.putExtra(Intent.EXTRA_SUBJECT,subject);
                intent.putExtra(Intent.EXTRA_TEXT,summary);

                intent.setType("message/rfc822");
                startActivity(Intent.createChooser(intent,"Choose EMail Client"));
            }
        });
    }
}
