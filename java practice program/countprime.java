public class countprime {
    public static void main(String[] args) {
        int count=0;
        for(int i=10;i<=20;i++)
        {
            int prime=0;
            for(int j=1;j<=i;j++){
               if(i%j==0){
                prime++;
               }
            }
            if(prime==2)
            {
                count++;
            }
        }
        System.out.println(count);
    }
}
