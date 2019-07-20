package com.example.ernest.camerafirebaseapp;

import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;

public class MainActivity extends AppCompatActivity {
    private TextView hello;
    Button singinButton;
    Button registerButton;
    EditText editTextEmail;
    EditText editTextPassword;
    FirebaseAuth auth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        singinButton=findViewById(R.id.buttonSignIn);
        registerButton=findViewById(R.id.buttonRegister2);
        editTextEmail=findViewById(R.id.editTextEmail);
        editTextPassword=findViewById(R.id.editTextPassword);
        auth = FirebaseAuth.getInstance();

        singinButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(final View v) {
                String email = editTextEmail.getText().toString();
                final String password = editTextPassword.getText().toString();

                if (TextUtils.isEmpty(email)) {
                    Toast.makeText(getApplicationContext(), "Enter email address!", Toast.LENGTH_SHORT).show();
                    return;
                }

                if (TextUtils.isEmpty(password)) {
                    Toast.makeText(getApplicationContext(), "Enter password!", Toast.LENGTH_SHORT).show();
                    return;
                }



                //authenticate user
                auth.signInWithEmailAndPassword(email, password)
                        .addOnCompleteListener(MainActivity.this, new OnCompleteListener<AuthResult>() {
                            @Override
                            public void onComplete(@NonNull Task<AuthResult> task) {
                                // If sign in fails, display a message to the user. If sign in succeeds
                                // the auth state listener will be notified and logic to handle the
                                // signed in user can be handled in the listener.
                                if (!task.isSuccessful()) {
                                    // there was an error
                                    if (password.length() < 7) {
                                        Toast.makeText(getApplicationContext(), "Password too short!", Toast.LENGTH_LONG).show();
                                        editTextPassword.setText("");
                                    } else {
                                        Toast.makeText(getApplicationContext(), "Authtentication error check data", Toast.LENGTH_LONG).show();
                                        editTextPassword.setText("");
                                        editTextEmail.setText("");
                                    }
                                } else {
                                    Toast.makeText(getApplicationContext(), "Siri app", Toast.LENGTH_LONG).show();
                                    /*Intent intent = new Intent(MainActivity.this, MenuActivity.class);
                                    startActivity(intent);
                                    finish();*/
                                    menu(v);
                                    //editTextEmail.setText("siri app");
                                }
                            }
                        });
            }
        });
        registerButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                sendMessage(v);
            }
        });
    }
    public void sendMessage(View view) {
        Intent intent = new Intent(this, RegisterActivity.class);
        startActivity(intent);
    }
    public void menu(View view) {
        Intent intent = new Intent(this, MenuActivity.class);
        startActivity(intent);
    }

}
