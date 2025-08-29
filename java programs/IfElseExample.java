import java.util.Scanner;
public class IfElseExample {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        int mark=sc.nextInt();
        if(mark>90 && mark<=100)
           System.out.println("Grade A");
        else if(mark>80 && mark<=90)
           System.out.println("Grade B");
        else if(mark>70 && mark<=80)
           System.out.println("Grade B");
        else if(mark>60 && mark<=70)
           System.out.println("Grade C");
        else if(mark>50 && mark<=60)
           System.out.println("Grade D");
        else
           System.out.println("Fail");
    }
}
