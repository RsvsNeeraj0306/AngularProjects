package com.prodapt.learningspring.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.prodapt.learningspring.entity.Comment;
import com.prodapt.learningspring.entity.Replies;

import java.util.List;

public interface RepliesRepository extends CrudRepository<Replies, Integer> {
	@Query(value = "select * from replies r where comment_id = ?1", nativeQuery= true)
	List<Comment> findAllByPostId(Integer commentId);

}
