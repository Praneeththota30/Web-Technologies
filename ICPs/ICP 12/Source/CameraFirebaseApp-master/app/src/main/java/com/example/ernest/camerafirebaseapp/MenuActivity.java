package com.example.ernest.camerafirebaseapp;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

public class MenuActivity extends AppCompatActivity {
    Button galleryButton;
    Button cameraButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activitymenu);

        galleryButton=findViewById(R.id.buttonGallery);
        cameraButton=findViewById(R.id.buttonCamera);

        galleryButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MenuActivity.this,/*Set next activity*/ Gallery.class);
                startActivity(intent);
                //finish();
            }
        });

        cameraButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MenuActivity.this,/*Set next activity*/ AndroidCameraApi.class);
                startActivity(intent);
                //finish();
            }
        });
    }
}
