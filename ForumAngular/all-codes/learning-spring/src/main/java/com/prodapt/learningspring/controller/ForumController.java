package com.prodapt.learningspring.controller;


import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.hibernate.type.descriptor.jdbc.TimeAsTimestampWithTimeZoneJdbcType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.prodapt.learningspring.business.LoggedInUser;
import com.prodapt.learningspring.business.NeedsAuth;
import com.prodapt.learningspring.controller.binding.AddCommentForm;
import com.prodapt.learningspring.controller.binding.AddPostForm;
import com.prodapt.learningspring.controller.binding.addReplyForm;
import com.prodapt.learningspring.controller.exception.ResourceNotFoundException;
import com.prodapt.learningspring.entity.Comment;
import com.prodapt.learningspring.entity.LikeId;
import com.prodapt.learningspring.entity.LikeRecord;
import com.prodapt.learningspring.entity.Post;
import com.prodapt.learningspring.entity.Replies;
import com.prodapt.learningspring.entity.User;
import com.prodapt.learningspring.repository.CommentRepository;
import com.prodapt.learningspring.repository.LikeCRUDRepository;
import com.prodapt.learningspring.repository.LikeCountRepository;
import com.prodapt.learningspring.repository.PostRepository;
import com.prodapt.learningspring.repository.RepliesRepository;
import com.prodapt.learningspring.repository.UserRepository;

import jakarta.annotation.PostConstruct;
import jakarta.servlet.ServletException;

@Controller
@RequestMapping("/forum")
@CrossOrigin(origins = {"http://localhost:4200", "http://127.0.0.1:4200"})
public class ForumController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PostRepository postRepository;

	@Autowired
	private LikeCountRepository likeCountRepository;

	@Autowired
	private LikeCRUDRepository likeCRUDRepository;

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private LoggedInUser loggedInUser;

	@Autowired
	private RepliesRepository RepliesRepository;

	private List<User> userList;

	@PostConstruct
	public void init() {
		userList = new ArrayList<>();
	}

	//  @NeedsAuth(loginPage = "/loginpage")
	@GetMapping("/post/form")
	public String getPostForm(Model model) {
		model.addAttribute("postForm", new AddPostForm());
		userRepository.findAll().forEach(user -> userList.add(user));
		model.addAttribute("userList", userList);
		model.addAttribute("authorid", 1);
		return "forum/postForm";
	}

	@PostMapping("/post/add")
	public String addNewPost(@ModelAttribute("postForm") AddPostForm postForm, BindingResult bindingResult,
			RedirectAttributes attr) throws ServletException {
		if (bindingResult.hasErrors()) {
			System.out.println(bindingResult.getFieldErrors());
			attr.addFlashAttribute("org.springframework.validation.BindingResult.post", bindingResult);
			attr.addFlashAttribute("post", postForm);
			return "redirect:/forum/post/form";
		}
		Optional<User> user = userRepository.findById(1);
		// if (user.isEmpty()) {
		// 	throw new ServletException("Something went seriously wrong and we couldn't find the user in the DB");
		// }
		Post post = new Post();
		post.setAuthor(user.get());
		post.setContent(postForm.getContent());
		post.setPostDate();
		postRepository.save(post);

		return String.format("redirect:/forum/post/%d", post.getId());
	}

	// @NeedsAuth(loginPage = "/loginpage")
	@GetMapping("/post/{id}")
	 public ResponseEntity<?> getPostDetail(@PathVariable int id) {
        try {
            Optional<Post> post = postRepository.findById(id);
			// List<Comment> comment = commentRepository.findAllByPostId(post.get().getId());
			//Optional<Comment> comment = commentRepository.findById(null)
            if (post.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
			// List<Object> response = new ArrayList<>();
			//  response.add(post.get());
			// response.add(comment);
	
			return ResponseEntity.ok(post.get());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

	@GetMapping("/comments/{id}")
	public ResponseEntity<?> getComments(@PathVariable int id) {
            Optional<Post> post = postRepository.findById(id);
			List<Comment> comment = commentRepository.findAllByPostId(post.get().getId());
			return ResponseEntity.ok(comment);

	}

	@PostMapping("/post/{id}/like")
	public String postLike(@PathVariable int id, Integer likerId, RedirectAttributes attr) {
		LikeId likeId = new LikeId();
		likeId.setUser(userRepository.findById(loggedInUser.getLoggedInUser().getId()).get());
		likeId.setPost(postRepository.findById(id).get());
		LikeRecord like = new LikeRecord();
		like.setLikeId(likeId);
		likeCRUDRepository.save(like);
		return String.format("redirect:/forum/post/%d", id);
	}

	@PostMapping("/addComment/{id}")
    public ResponseEntity<String> addCommentToPost(@RequestBody AddCommentForm commentForm, @PathVariable int id) {
        Optional<User> user = userRepository.findById(1); // You can change this to fetch the logged-in user
        Optional<Post> post = postRepository.findById(id);

        if (post.isPresent()) {
            Comment comment = new Comment();
            comment.setContent(commentForm.getContent());
			System.out.println(commentForm.getContent());
            comment.setPost(post.get());
            comment.setUser(user.get());
            comment.setPostDate();
            commentRepository.save(comment);
            return ResponseEntity.status(HttpStatus.CREATED).body("Comment added successfully");
        } else {
            return ResponseEntity.notFound().build();
		}}

	@PostMapping("/post/{id}/comment/reply")
	public String addReplyToComment(@ModelAttribute("replyForm") addReplyForm replyForm, @PathVariable int id) {
		Optional<User> user = userRepository.findById(loggedInUser.getLoggedInUser().getId());
		Optional<Post> post = postRepository.findById(id);
		Optional<Comment> comment = commentRepository.findById(id);

		if (comment.isPresent() ) {
			Replies reply = new Replies();
			reply.setContent(replyForm.getContent());
			reply.setComment(comment.get());
			reply.setUser(user.get());
			RepliesRepository.save(reply);
		}
		return String.format("redirect:/forum/post/%d", id);
	}

}