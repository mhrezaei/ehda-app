package com.temp;



import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by aryan on 3/23/18.
 */

public class SecurityModule extends ReactContextBaseJavaModule {


    public SecurityModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("username", "odeviceapi");
        constants.put("password", "123456789");
        return constants;
    }


    @Override
    public String getName() {
        return "SecurityChamber";
    }
}
