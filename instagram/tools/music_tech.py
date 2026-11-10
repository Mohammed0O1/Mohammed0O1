import sys, wave, numpy as np
dur=float(sys.argv[1]); out=sys.argv[2]; sr=44100
t=np.arange(int(dur*sr))/sr; x=np.zeros_like(t)
bpm=100; beat=60/bpm; bar=beat*4
chords=[[110.0,220.0,261.63,329.63],[110.0,220.0,261.63,329.63],[87.31,174.61,220.0,261.63],[98.0,196.0,246.94,293.66]]
def add(a,sig):
    if a>=len(x): return
    b=min(len(x),a+len(sig)); x[a:b]+=sig[:b-a]
for i in range(int(dur/bar)+1):
    c=chords[i%4]; a=int(i*bar*sr)
    if a>=len(x): break
    n=int(bar*sr); tt=np.arange(n)/sr; env=np.minimum(1,tt/0.3)*np.minimum(1,(bar-tt)/0.3)
    add(a,env*(np.sin(2*np.pi*c[0]*tt)*0.18+sum(np.sin(2*np.pi*f*tt)+0.4*np.sin(2*np.pi*f*1.005*tt) for f in c[1:])*0.035))
    for s in range(16):
        f=c[1:][[0,1,2,1][s%4]]*(2 if s%8>=4 else 1); m=int(0.16*sr); ts=np.arange(m)/sr
        add(a+int(s*beat/4*sr),(np.sign(np.sin(2*np.pi*f*ts))*0.3+np.sin(2*np.pi*f*ts))*np.exp(-ts*22)*0.06)
for k in range(int(dur/beat)):
    m=int(0.2*sr); ts=np.arange(m)/sr
    add(int(k*beat*sr),np.sin(2*np.pi*(50+80*np.exp(-ts*35))*ts)*np.exp(-ts*18)*0.5)
    m=int(0.04*sr); ts=np.arange(m)/sr
    add(int((k+0.5)*beat*sr),np.random.default_rng(k).normal(0,1,m)*np.exp(-ts*110)*0.05)
x=np.clip(x*np.minimum(1,t/0.8)*np.minimum(1,(dur-t)/1.5),-1,1)
w=wave.open(out,'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes((x*0.8*32767).astype('<i2').tobytes()); w.close()
