import java.util.Scanner;
public class Swap {
    public static void main(String args[])
     {
    	 Scanner sc=new Scanner(System.in);
    	 int a=sc.nextInt();
    	 int b=sc.nextInt();
    	 int temp=b;
    	 b=a;
    	 a=temp;
    	 System.out.println(a);
    	 System.out.println(b);
     }
}
