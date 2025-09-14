class Armstrong{
    public static void main(String[] args) {
        int n = 153;
        int original=n;
        int sum=0;
        while(n!=0)
        {
            int digit=n%10;
            int cube=(digit*digit*digit);
            sum = sum+cube;
            n/=10;
        }
        if(original==sum)
        {
            System.out.println("Armstrong no");
        }
        else{
            System.out.println("not");
        }
    }
}