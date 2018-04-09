package com.ehdaapp;

import android.Manifest;
import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.os.Build;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.support.annotation.Nullable;
import android.support.v4.app.ActivityCompat;
import android.view.View;

import com.facebook.react.ReactActivity;

import java.util.Locale;

public class MainActivity extends ReactActivity {
    public static boolean storageAccess = true;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState, @Nullable PersistableBundle persistentState) {
        super.onCreate(savedInstanceState, persistentState);

    }

    @Override
    protected String getMainComponentName() {
        return "EhdaApp";
    }
}
