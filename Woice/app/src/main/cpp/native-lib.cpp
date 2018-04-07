#include <jni.h>
#include <string>

JNIEXPORT jstring

JNICALL
Java_com_yasna_woice_MainActivity_stringFromJNI(
        JNIEnv *env,
        jobject /* this */) {
    std::string hello = "Hello from C++";
    return env->NewStringUTF(hello.c_str());
}
