import java.util.Arrays;
public class Target {
   public static void main(String[] args) {
        int[] arr = {1, 4, 6, 8, 10, 12};
        int target = 14;

        Arrays.sort(arr); // Sort the array

        int left = 0, right = arr.length - 1;
        boolean found = false;

        while (left < right) {
            int sum = arr[left] + arr[right];
            if (sum == target) {
                System.out.println("Pair found: (" + arr[left] + ", " + arr[right] + ")");
                found = true;
                break;
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }

        if (!found) {
            System.out.println("No pair found with sum " + target);
        }
    } 
}
