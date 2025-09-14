public class Pascaltriangle {
    public static void main(String[] args) {
        int n = 5;
        for (int line = 0; line < n; line++) {
            for (int space = 0; space < n - line; space++) {
                System.out.print(" ");
            }
            int number = 1;
            for (int i = 0; i <= line; i++) {
                System.out.print(number + " ");
                number = number * (line - i) / (i + 1);
            }
            System.out.println();
        }
    }
}
