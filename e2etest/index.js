import { HomePage } from '../e2etest/homePageTest';
import {
  SignUpPage,
  SignUpWithInvalidDetailsFails,
  SignUpWithValidCredentials
} from '../e2etest/signUpPageTest';
import {
  SignInPage,
  UserSignInFailsMissingFields,
  UserSignInFails,
  UserSignInSuccessfull,
  UserSignOut
} from '../e2etest/signinPageTest';
import {
  AdminOperation,
  AddBookFailsInvalidDetails,
  AddBookSuccess,
  AdminDashboardBookListTab,
  AdminDashboardBorrowRequestTab,
  AdminDashboardReturnRequestTab,
  RequestedBooksTable
} from '../e2etest/adminOperationTest';
import {
  UserOperation,
  Search,
  AllBooks,
  Favorite,
  BookDetails,
  Vote,
  Review,
  ProfileView,
  ProfileEdit,
  Logout
} from '../e2etest/userOperationTest';


// const HomePageTest = () => {
//   HomePage();
// };

// const SignUpPage = () => {
//   signUpPageTest();
// };
// const SignInPage = () => {
//   signinPageTest();
// };
// const AdminOperartion = () => {
//   adminOperationTest();
// };

// const UserOperation = () => {
//   userOperationTest();
// };


// HomePageTest();
// SignUpPage();
// SignInPage();
// AdminOperartion();
// UserOperation();

export default {
  'Ensure all display of home page': (browser) => HomePage(browser),
  'Ensure all elements are present on sign up page display': (browser) => SignUpPage(browser),
  'Ensure user signup fails when invalid details are provided': (browser) => SignUpWithInvalidDetailsFails(browser),
  'Ensure user can signup with valid details on the signup page': (browser) => SignUpWithValidCredentials(browser),
  'Ensure all elements are present on sign in page display': (browser) => SignInPage(browser),
  'Ensure user signin fails when invalid details are provided': (browser) => UserSignInFailsMissingFields(browser),
  'Ensure user signin fails': (browser) => UserSignInFails(browser),
  'Ensure user can signin with valid details on the signin page': (browser) => UserSignInSuccessfull(browser),
  'User can sign out of the application': (browser) => UserSignOut(browser),
  'Admin Operation': (browser) => AdminOperation(browser),
  'Add Book fails when invalid details are provided': (browser) => AddBookFailsInvalidDetails(browser),
  'Add Book: admin can add book with valid credentials': (browser) => AddBookSuccess(browser),
  'AdminDashboard: book list tab': (browser) => AdminDashboardBookListTab(browser),
  'AdminDashboard:  Borrow request list tab': (browser) => AdminDashboardBorrowRequestTab(browser),
  'AdminDashboard: Return request tab': (browser) => AdminDashboardReturnRequestTab(browser),
  'AdminDashboard: Requested books table': (browser) => RequestedBooksTable(browser),
  'User Operation': (browser) => UserOperation(browser),
  'Search:User should be able to search for books': (browser) => Search(browser),
  'All Books: User should see all books': (browser) => AllBooks(browser),
  'Favorite: users can add a book as favorite and view their favorite list': (browser) => Favorite(browser),
  'Book Details: users can view book details': (browser) => BookDetails(browser),
  'Vote: users can upvote or downvote a book': (browser) => Vote(browser),
  'Review: users can post, edit and delete review on a book': (browser) => Review(browser),
  'Profile: user can view his/her profile': (browser) => ProfileView(browser),
  'Profile: user can edit his/her profile': (browser) => ProfileEdit(browser),
  'Logout: User should be able to log out': (browser) => Logout(browser)
};

