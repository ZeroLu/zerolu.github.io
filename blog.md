# Make programming less painful

## plan
- Configure Android SDK with Unity and trouble shooting
- Install libraries for python of C4D
- How to troubleshoot android install problem (read the output!!)
- How to use NatCorder to record ARCore video

### Install libraries for python of C4D
I finally knows how to add libraries to python of C4D.
Simply use
```bash
pip install --target=C4DINSTALLLOCATION/resource/modules/python/Python.win64.framework/Lib/site-packages requests # numpy is an example of python library
```

And it works!!!!
But somehow Opencv and Numpy won't work, which is really weird.

### Configure Android SDK with Unity and trouble shooting
You have probably used
There is a line called 
Use tool

https://blog.csdn.net/thmen/article/details/79424469

Don't use the latest Java, use 1.8 instead.



