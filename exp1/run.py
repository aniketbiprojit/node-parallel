import sys

def function(a,b):
    a=int(a)
    b=int(b)
    return a**b

print(function(sys.argv[1],sys.argv[2]),end='')