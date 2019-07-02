package com.example.prane.login;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class MainActivity extends AppCompatActivity {

    private EditText Name;
    private EditText Password;
    private Button Login;
    private int counter = 5;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Name = (EditText)findViewById(R.id.Name);
        Password = (EditText)findViewById(R.id.Password);
        Login = (Button)findViewById(R.id.Login);
        Login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                validate(Name.getText().toString(),Password.getText().toString());
            }
        });
    }

    private void validate(String Name, String Password){
        if(Name.equals("Praneeth")  && Password.equals("1234")){
            Intent intent = new Intent(MainActivity.this, SecondActivity.class);
            startActivity(intent);
            }else{
            Login.setEnabled(false);

        }
    }
}
