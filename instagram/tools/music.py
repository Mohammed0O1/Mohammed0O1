import sys, wave, numpy as np
dur=float(sys.argv[1]); out=sys.argv[2]; sr=44100
t=np.arange(int(dur*sr))/sr
chords=[[220.0,261.63,329.63],[174.61,220.0,261.63],[261.63,329.63,392.0],[196.0,246.94,293.66]]
bar=60/84*4
x=np.zeros_like(t)
for i in range(int(dur/bar)+1):
    a=int(i*bar*sr); b=min(len(t),int((i+1)*bar*sr))
    if a>=len(t): break
    tt=t[a:b]-t[a]; env=np.minimum(1,tt/0.6)*np.minimum(1,(bar-tt)/0.6)
    for f in chords[i%4]:
        x[a:b]+=env*(np.sin(2*np.pi*f*tt)+0.5*np.sin(2*np.pi*f*1.004*tt)+0.25*np.sin(2*np.pi*2*f*tt))*0.09
    x[a:b]+=env*np.sin(2*np.pi*chords[i%4][0]/2*tt)*0.16
beat=60/84
for k in range(int(dur/beat)):
    a=int(k*beat*sr); n=int(0.22*sr); b=min(len(t),a+n); tt=np.arange(b-a)/sr
    x[a:b]+=np.sin(2*np.pi*(55+70*np.exp(-tt*30))*tt)*np.exp(-tt*16)*0.45
    if k%2==1:
        h=int((k*beat+beat/2)*sr); e=min(len(t),h+int(0.05*sr)); tt=np.arange(e-h)/sr
        x[h:e]+=np.random.default_rng(k).normal(0,1,e-h)*np.exp(-tt*90)*0.05
fade=np.minimum(1,t/1.0)*np.minimum(1,(dur-t)/1.5)
x=np.clip(x*fade,-1,1)
w=wave.open(out,'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes((x*0.8*32767).astype('<i2').tobytes()); w.close()
