import java.util.Scanner;
public class DoWhileExample {
    public static void main(String args[])
    {
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        int i=1;
        do
        {
            System.out.print(i+" ");
            i++;
        }while(i<n);
        
    }
}
