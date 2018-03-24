package com.temp;


import android.content.Context;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by aryan on 3/23/18.
 */

public class FileModule extends ReactContextBaseJavaModule {


    public FileModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("username", "odeviceapi");
        constants.put("password", "123456789");
        return constants;
    }

    public String resolvePath(String to){
        return getReactApplicationContext().getFilesDir().getAbsolutePath() + '/' + to;
    }

    @ReactMethod
    public void saveSync(String to, String base64) {

        try {
            File f = new File(resolvePath(to));
            f.mkdirs();
            FileOutputStream stream = new FileOutputStream(f);
            try {
                stream.write(base64.getBytes());
            } finally {
                stream.close();
            }
        } catch (Exception ignored) {
        }
    }
    @ReactMethod
    public void save(String to,String base64, Promise promise) {
        try {
            File f = new File(resolvePath(to));
            f.mkdirs();
            FileOutputStream stream = new FileOutputStream(f);
            try {
                stream.write(base64.getBytes());
            } finally {
                stream.close();
            }
            promise.resolve(1);
        } catch (Exception e) {
            promise.reject("IO error", e.getMessage());
        }
    }


    @ReactMethod
    public void exists(String to, Promise promise) {
        File f = new File(resolvePath(to));
        promise.resolve(f.exists() ? 1 : 0);
    }

    @ReactMethod
    public void path(String to, Promise promise) {
        promise.resolve(getReactApplicationContext().getFilesDir().getAbsolutePath() + '/' + to);
    }

    @ReactMethod
    public void read(String from, Promise promise) {
        try {
            InputStream inputStream = getReactApplicationContext().openFileInput(from);
            InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
            BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
            String receiveString = "";
            StringBuilder stringBuilder = new StringBuilder();

            while ((receiveString = bufferedReader.readLine()) != null) {
                stringBuilder.append(receiveString);
            }

            inputStream.close();
            promise.resolve(stringBuilder.toString());
        } catch (Exception e) {
            promise.reject("IO error", e.getMessage());
        }
    }

    @Override
    public String getName() {
        return "FileIO";
    }
}
