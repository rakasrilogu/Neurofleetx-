import java.util.Scanner;
public class ForLoopExample {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        int num=sc.nextInt();
        int n=sc.nextInt();
        for(int i=1;i<=n;i++)
        {
            System.out.println(num+" "+"*"+" " +i +" "+"="+" "+(num*i));
        }
    }
}
